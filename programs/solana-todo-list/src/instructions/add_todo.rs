use anchor_lang::prelude::*;

use crate::states::todo::{TodoAccount, UserProfile};

pub fn add_todo(ctx: Context<AddTodo>, content: String) -> Result<()> {
    let todo_account = &mut ctx.accounts.todo_account;
    let user_profile = &mut ctx.accounts.user_profile;
    todo_account.authority = ctx.accounts.authority.key();
    todo_account.idx = user_profile.last_todo;
    todo_account.content = content;
    todo_account.marked = false;

    user_profile.last_todo = user_profile.last_todo.checked_add(1).unwrap();
    user_profile.todo_account = user_profile.todo_account.checked_add(1).unwrap();
    msg!("{:?}", todo_account);
    msg!("{:?}", user_profile);
    Ok(())
}

#[derive(Accounts, Debug)]
pub struct AddTodo<'info> {
    #[account(
        init,
        payer = authority,
        space = TodoAccount::ACCOUNT_SPACE,
        seeds = [
            TodoAccount::SEED_PREFIX,
            user.key().as_ref(),
            authority.key().as_ref(),
        ],
        bump,
    )]
    todo_account: Account<'info, TodoAccount>,
    #[account(
        mut,
        seeds = [
            UserProfile::SEED_PREFIX,
            user.key().as_ref(),
            authority.key().as_ref(),
        ],
        bump,
        has_one = authority
    )]
    user_profile: Account<'info, UserProfile>,
    user: SystemAccount<'info>,
    #[account(mut)]
    authority: Signer<'info>,
    system_program: Program<'info, System>,
}
