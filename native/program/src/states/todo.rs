use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::pubkey::Pubkey;

#[derive(Debug, BorshDeserialize, BorshSerialize)]
pub struct TodoAccount {
    pub authority: Pubkey,
    pub idx: u8,
    pub content: String,
    pub marked: bool,
}

impl TodoAccount {
    pub const ACCOUNT_SPACE: usize = 8 + std::mem::size_of::<TodoAccount>();

    pub const SEED_PREFIX: &[u8] = b"TODO_ACCOUNT";
}
