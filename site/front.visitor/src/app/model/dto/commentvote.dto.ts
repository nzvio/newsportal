export interface ICommentVoteDTO {
    commentId: string;
    userId: string;
    vote: number; // +1 or -1 (like or dislike)
}
