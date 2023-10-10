use anchor_lang::prelude::*;

const MAX_LEN: u8 = 10;

// #[account]
#[derive(InitSpace, AnchorDeserialize, AnchorSerialize, Clone, Debug)]
pub struct Todo {
    idx: i32,
    #[max_len(100)]
    content: String,
    marked: bool,
    pub authority: Pubkey,
}

#[account]
#[derive(InitSpace, Debug)]
pub struct TodoList {
    #[max_len(10)]
    data: Vec<Todo>,
}

impl TodoList {
    pub const ACCOUNT_SPACE: usize = (4 + (4 + 100) + 1) * 10;

    pub const SEED_PREFIX: &'static str = "todo_list";

    pub fn new(data: [Todo; MAX_LEN as usize], bump: u8) -> Self {
        TodoList { data: vec![] }
    }
}

#[account]
#[derive(InitSpace, Debug)]
pub struct TodoData {
    #[max_len(100)]
    content: String,
    // marked: bool,
}

impl TodoData {
    pub const ACCOUNT_SPACE: usize = 4 + 100 + 1;

    pub const SEED_PREFIX: &'static str = "todo_list";

    pub fn new(content: String, marked: bool) -> Self {
        TodoData {
            content,
            // marked,
        }
    }
}

#[account]
#[derive(Default, Debug)]
pub struct UserProfile {
    pub authority: Pubkey,
    pub last_todo: u8,
    pub todo_account: u8,
}

impl UserProfile {
    pub const ACCOUNT_SPACE: usize = 8 + std::mem::size_of::<UserProfile>();

    pub const SEED_PREFIX: &[u8] = b"USER_STATE";
}

#[account]
#[derive(Default, Debug)]
pub struct TodoAccount {
    pub authority: Pubkey,
    pub idx: u8,
    pub content: String,
    pub marked: bool,
}

impl TodoAccount {
    pub const ACCOUNT_SPACE: usize = 8 + std::mem::size_of::<TodoAccount>();

    pub const SEED_PREFIX: &[u8] = b"TODO_STATE";
}
