use borsh::BorshDeserialize;
use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint::ProgramResult,
    msg,
    program_error::ProgramError,
    pubkey::Pubkey,
};

use crate::{
    error::TodoError,
    states::{TodoAccount, UpdateTodoContent},
};

pub fn update_todo(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    update_todo_content: UpdateTodoContent,
) -> ProgramResult {
    let accounts_iter = &mut accounts.iter();
    let target = next_account_info(accounts_iter)?;
    let payer = next_account_info(accounts_iter)?;

    let (pda, _bump) = Pubkey::find_program_address(
        &[
            TodoAccount::SEED_PREFIX,
            payer.key.as_ref(),
            [update_todo_content.idx as u8].as_ref(),
        ],
        program_id,
    );

    msg!("data:{:?}", update_todo_content);

    if target.key != &pda {
        return Err(TodoError::NotOwnedByAccount.into());
    }

    if target.owner != program_id {
        return Err(ProgramError::InvalidAccountOwner);
    }
    msg!("&target.data.borrow(): {:?}", &target.data.borrow());
    let todo_data = TodoAccount::try_from_slice(&target.data.borrow())?;
    msg!("todo_data: {:?}", todo_data);
    // todo_data.content = update_todo_content.content;
    // msg!("todo_data: {:?}", todo_data);
    // todo_data.serialize(&mut *target.data.borrow_mut())?;
    // msg!("todo_data: {:?}", todo_data);
    // msg!("target: {:?}", target);
    Ok(())
}
