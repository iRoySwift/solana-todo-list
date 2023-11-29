use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint::ProgramResult,
    msg,
    pubkey::Pubkey,
};

use crate::{error::TodoError, states::UserAccount};

pub fn initialize_user(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    user_account: UserAccount,
) -> ProgramResult {
    let accounts_iters = &mut accounts.iter();
    let target_account = next_account_info(accounts_iters)?;
    let payer = next_account_info(accounts_iters)?;
    let (pda, bump) =
        Pubkey::find_program_address(&[UserAccount::SEED_PREFIX, payer.key.as_ref()], program_id);
    msg!("target:{:?}", target_account);
    msg!("user_account:{:?}", user_account);

    if target_account.key != &pda {
        return Err(TodoError::NotOwnedByAccount.into());
    }
    Ok(())
}
