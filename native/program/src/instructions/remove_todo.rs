use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint::ProgramResult,
    msg,
    program_error::ProgramError,
    pubkey::Pubkey,
};

use crate::{
    error::TodoError,
    states::{TodoAccount, UserAccount},
};

pub fn remove_todo(program_id: &Pubkey, accounts: &[AccountInfo], idx: u8) -> ProgramResult {
    let accounts_iter = &mut accounts.iter();
    let user_account = next_account_info(accounts_iter)?;
    let target = next_account_info(accounts_iter)?;
    let payer = next_account_info(accounts_iter)?;

    if user_account.owner != program_id || target.owner != program_id {
        return Err(ProgramError::InvalidAccountOwner);
    }

    let (user_pda, _user_bump) =
        Pubkey::find_program_address(&[UserAccount::SEED_PREFIX, payer.key.as_ref()], program_id);
    if user_account.key != &user_pda {
        return Err(TodoError::NotOwnedByAccount.into());
    }

    let (pda, _bump) = Pubkey::find_program_address(
        &[
            TodoAccount::SEED_PREFIX,
            payer.key.as_ref(),
            [idx as u8].as_ref(),
        ],
        program_id,
    );
    if target.key != &pda {
        return Err(TodoError::NotOwnedByAccount.into());
    }

    let mut user_data = UserAccount::try_from_slice(&user_account.data.borrow_mut())?;
    user_data.last_todo = user_data.last_todo.checked_sub(1).unwrap();
    user_data.todo_total = user_data.todo_total.checked_sub(1).unwrap();
    msg!("{:?}", user_data);
    user_data.serialize(&mut *user_account.data.borrow_mut())?;
    // close target account
    msg!("rent{:?}", target.lamports());
    // **payer.lamports.borrow_mut() += target.lamports();
    // **target.lamports.borrow_mut() = 0;
    **payer.try_borrow_mut_lamports()? += target.lamports();
    **target.try_borrow_mut_lamports()? = 0;
    msg!("target: {:?}", target);
    Ok(())
}
