use borsh::{BorshDeserialize, BorshSerialize};

#[derive(BorshDeserialize, BorshSerialize, Debug)]
pub struct UserAccount {
    pub authority: String,
    pub last_todo: u8,
    pub todo_total: u8,
}

impl UserAccount {
    pub const ACCOUNT_SPACE: usize = 8 + std::mem::size_of::<UserAccount>();

    // #[constant]
    pub const SEED_PREFIX: &[u8] = b"USER_ACCOUNT";
}
