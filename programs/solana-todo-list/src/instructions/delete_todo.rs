use anchor_lang::prelude::*;

use crate::states::todo::{TodoAccount, UserProfile};

pub fn delete_todo(ctx: Context<DeleteTodo>) -> Result<()> {
    let todo_account = &mut ctx.accounts.todo_account;
    let user_profile = &mut ctx.accounts.user_profile;

    Ok(())
}

#[derive(Accounts)]
pub struct DeleteTodo<'info> {
    #[account(
        mut,
        seeds = [
            TodoAccount::SEED_PREFIX,
            user.key().as_ref(),
        ],
        bump
    )]
    pub todo_account: Account<'info, TodoAccount>,
    #[account(
        mut,
        seeds = [
            UserProfile::SEED_PREFIX,
            user.key().as_ref(),
        ],
        bump
    )]
    pub user_profile: Account<'info, UserProfile>,
    pub user: SystemAccount<'info>,
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}
