use anchor_lang::prelude::*;

use crate::states::todo::UserProfile;

pub fn initialize_user(ctx: Context<InitializeUser>) -> Result<()> {
    let user_profile = &mut ctx.accounts.user_profile;
    user_profile.authority = ctx.accounts.authority.key();
    user_profile.last_todo = 0;
    user_profile.todo_account = 0;

    Ok(())
}

#[derive(Accounts)]
pub struct InitializeUser<'info> {
    #[account(
        init,
        payer = authority,
        space = UserProfile::ACCOUNT_SPACE,
        seeds = [
            UserProfile::SEED_PREFIX,
            user.key().as_ref(),
            authority.key().as_ref()
        ],
        bump
    )]
    pub user_profile: Account<'info, UserProfile>,
    pub user: SystemAccount<'info>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}
