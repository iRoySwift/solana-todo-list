use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint::ProgramResult,
    msg,
    pubkey::Pubkey,
};

use crate::{error::TodoError, states::TodoAccount};

pub fn mark_todo(program_id: &Pubkey, accounts: &[AccountInfo], idx: u8) -> ProgramResult {
    let accounts_iter = &mut accounts.iter();
    let target = next_account_info(accounts_iter)?;
    let payer = next_account_info(accounts_iter)?;

    let (pda, _bump) = Pubkey::find_program_address(
        &[
            TodoAccount::SEED_PREFIX,
            payer.key.as_ref(),
            &[idx as u8].as_ref(),
        ],
        program_id,
    );
    msg!("idx: {:?}", idx);

    if target.key != &pda {
        return Err(TodoError::NotOwnedByAccount.into());
    }
    Ok(())
}
