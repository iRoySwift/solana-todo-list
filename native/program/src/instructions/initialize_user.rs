use borsh::BorshSerialize;
use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint::ProgramResult,
    msg,
    program::invoke_signed,
    pubkey::Pubkey,
    rent::Rent,
    system_instruction,
    sysvar::Sysvar,
};

use crate::{error::TodoError, states::UserAccount};

pub fn initialize_user(program_id: &Pubkey, accounts: &[AccountInfo]) -> ProgramResult {
    let accounts_iters = &mut accounts.iter();
    let target = next_account_info(accounts_iters)?;
    let payer = next_account_info(accounts_iters)?;

    let (pda, bump) =
        Pubkey::find_program_address(&[UserAccount::SEED_PREFIX, payer.key.as_ref()], program_id);

    if target.key != &pda {
        return Err(TodoError::NotOwnedByAccount.into());
    }

    // close target account
    // msg!("rent{:?}", target.lamports());
    // **payer.lamports.borrow_mut() += target.lamports();
    // **target.try_borrow_mut_lamports()? = 0;

    let user_data = UserAccount {
        authority: payer.key.to_string(),
        last_todo: 0,
        todo_total: 0,
    };

    let space = user_data.try_to_vec()?.len() as usize;
    let lamports = (Rent::get()?).minimum_balance(space);
    let instruction = &system_instruction::create_account(
        payer.key,
        target.key,
        lamports,
        space as u64,
        program_id,
    );
    let account_infos = &[target.clone(), payer.clone()];
    let signers_seeds: &[&[&[u8]]] = &[&[UserAccount::SEED_PREFIX, payer.key.as_ref(), &[bump]]];

    invoke_signed(instruction, account_infos, signers_seeds)?;

    // user_data.serialize(&mut &mut target.data.borrow_mut()[..])?;
    user_data.serialize(&mut *target.data.borrow_mut())?;
    msg!("user_data{:?}", user_data);
    msg!("target:{:?}", target);
    msg!("target data:{:?}", target.data);
    Ok(())
}
