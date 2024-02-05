use borsh::{BorshDeserialize, BorshSerialize};

#[derive(Debug, BorshDeserialize, BorshSerialize)]
pub struct UpdateTodoContent {
    pub idx: u8,
    pub content: String,
}
