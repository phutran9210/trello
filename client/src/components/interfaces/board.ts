// interface ICard {
//     id: string;
//     title: string;
//     content: string;
// }

// interface IList {
//     id: string;
//     title: string;
//     cardIds: string[];
// }

// interface IBoard {
//     id: string;
//     listIds: string[];
// }

export interface Card {
    _id: string;
    boardId: string;
    columnId: string;
    title: string;
    description: string | null;
    cover: string | null;
    memberIds: string[];
    comments: string[];
    attachments: string[];
}

export interface Column {
    _id: string;
    boardId: string;
    title: string;
    cardOrderIds: string[];
    cards: Card[];
}

export interface Board {
    _id: string;
    title: string;
    description: string;
    type: 'public' | 'private';
    ownerIds: string[];
    memberIds: string[];
    columnOrderIds: string[];
    columns: Column[];
}

export interface BoardProps {
    board: Board;
}

export interface PayloadCard {
    title : string,
    description : string,
    board_id : string,
    column_id : string, 
}

export interface PayloadCreateClumn{
    board_id : string,
    title : string,
    owner_column : string
}

export interface DragColumnPayload{
    board_id : string,
    columnOrderIds : string[]
}