export const reformatData = (data : any) => {
    const { content, sender } = data;
    const { room } = content;
  
    return {
      [room]: [{
        sender: sender,
        content: content.content
      }]
    };
}

//Tìm phần tử trùng 
export function findDuplicates(arr : string[] ) {
  let sorted_arr = [...arr].sort(); 
  let results = [];
  for (let i = 0; i < sorted_arr.length - 1; i++) {
      if (sorted_arr[i + 1] == sorted_arr[i]) {
          results.push(sorted_arr[i]);
      }
  }
  return results;
}

export function getOtherUsernames(participants : any, currentUserID : any) {
  // Filter out the logged in user and map to get usernames
  return participants.filter(user => user.user_id !== currentUserID).map(user => user.username);
}
