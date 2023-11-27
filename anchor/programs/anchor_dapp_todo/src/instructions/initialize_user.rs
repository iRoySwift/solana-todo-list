use anchor_lang::prelude::*;
use crate::states::user::UserAccount;

pub fn initialize_user(ctx: Context<InitializeUser>) -> Result<()> {
    let user_account = &mut ctx.accounts.user_account;
    user_account.authority = ctx.accounts.authority.key();
    user_account.last_todo = 0;
    user_account.todo_total = 0;

    Ok(())
}

#[derive(Accounts)]
#[instruction()]
pub struct InitializeUser<'info> {
    // We must specify the space in order to initialize an account.
    // First 8 bytes are default account discriminator,
    // next 8 bytes come from NewAccount.data being type u64.
    // (u64 = 64 bits unsigned integer = 8 bytes)
    #[account(init, payer = authority,space = UserAccount::ACCOUNT_SPACE,seeds=[UserAccount::SEED_PREFIX,authority.key().as_ref()],bump)]
    pub user_account: Account<'info, UserAccount>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}
