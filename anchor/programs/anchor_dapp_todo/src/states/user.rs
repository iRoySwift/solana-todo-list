use anchor_lang::prelude::*;

#[account]
#[derive(Default, Debug)]
pub struct UserAccount {
    pub authority: Pubkey,
    pub last_todo: u8,
    pub todo_total: u8,
}

impl UserAccount {
    pub const ACCOUNT_SPACE: usize = 8 + std::mem::size_of::<UserAccount>();

    #[constant]
    pub const SEED_PREFIX: &[u8] = b"USER_ACCOUNT";
}
