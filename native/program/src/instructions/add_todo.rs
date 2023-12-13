use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint::ProgramResult,
    msg,
    program::invoke_signed,
    program_error::ProgramError,
    pubkey::Pubkey,
    rent::Rent,
    system_instruction,
    sysvar::Sysvar,
};

use crate::{
    error::TodoError,
    states::{TodoAccount, UserAccount},
};

pub fn add_todo(program_id: &Pubkey, accounts: &[AccountInfo], content: String) -> ProgramResult {
    let accounts_iters = &mut accounts.iter();
    let user_account = next_account_info(accounts_iters)?;
    let target = next_account_info(accounts_iters)?;
    let payer = next_account_info(accounts_iters)?;

    let (user_pda, _user_bump) =
        Pubkey::find_program_address(&[UserAccount::SEED_PREFIX, payer.key.as_ref()], program_id);
    if user_account.key != &user_pda {
        return Err(TodoError::NotOwnedByAccount.into());
    }
    if user_account.owner != program_id {
        return Err(ProgramError::InvalidAccountOwner);
    }
    let mut user_data = UserAccount::try_from_slice(&user_account.data.borrow_mut())?;
    msg!("user_data{:?}", user_data);

    let (todo_pda, todo_bump) = Pubkey::find_program_address(
        &[
            TodoAccount::SEED_PREFIX,
            payer.key.as_ref(),
            &[user_data.last_todo as u8].as_ref(),
        ],
        program_id,
    );
    msg!("content:{:?}", content);

    if target.key != &todo_pda {
        return Err(TodoError::NotOwnedByAccount.into());
    }

    // close target account
    // **user_account.lamports.borrow_mut() += target.lamports();
    // **target.lamports.borrow_mut() = 0;

    let idx = user_data.last_todo;

    let todo_data = TodoAccount {
        authority: *payer.key,
        idx,
        content,
        marked: false,
    };

    let space = todo_data.try_to_vec()?.len() as usize;
    // let space = TodoAccount::ACCOUNT_SPACE as usize;
    msg!("space:{:?}", space);
    let lamports = Rent::get()?.minimum_balance(space);
    let instruction = &system_instruction::create_account(
        payer.key,
        target.key,
        lamports,
        space as u64,
        program_id,
    );
    let account_infos = &[target.clone(), payer.clone()];
    let signers_seeds: &[&[&[u8]]] = &[&[
        TodoAccount::SEED_PREFIX,
        payer.key.as_ref(),
        &[idx],
        &[todo_bump],
    ]];

    invoke_signed(instruction, account_infos, signers_seeds)?;

    todo_data.serialize(&mut *target.data.borrow_mut())?;
    msg!("todo_data: {:?}", todo_data);
    msg!("target: {:?}", target);

    user_data.last_todo += 1;
    user_data.todo_total += 1;
    user_data.serialize(&mut *user_account.data.borrow_mut())?;

    msg!("user_data: {:?}", user_data);
    msg!("user_account: {:?}", user_account);
    Ok(())
}
