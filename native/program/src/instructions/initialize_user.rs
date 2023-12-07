use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint::ProgramResult,
    msg,
    // program_error::ProgramError,
    pubkey::Pubkey,
};

use crate::{error::TodoError, states::UserAccount};

pub fn initialize_user(program_id: &Pubkey, accounts: &[AccountInfo]) -> ProgramResult {
    let accounts_iters = &mut accounts.iter();
    let target = next_account_info(accounts_iters)?;
    let payer = next_account_info(accounts_iters)?;
    let system_program = next_account_info(accounts_iters)?;
    let (pda, _bump) =
        Pubkey::find_program_address(&[UserAccount::SEED_PREFIX, payer.key.as_ref()], program_id);
    msg!("program_id:{:?}", program_id);
    msg!("target:{:?}", target);
    msg!("payer:{:?}", payer);
    msg!("pda:{:?}", pda);
    msg!("system_program:{:?}", system_program);

    if target.key != &pda {
        return Err(TodoError::NotOwnedByAccount.into());
    }
    // if target.owner != program_id {
    //     return Err(ProgramError::InvalidAccountOwner);
    // }
    Ok(())
}
