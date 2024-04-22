// format date 



export function formatDate(date : string){
    const currentDate = new Date();
    const postDate = new Date(date);
    const diff = currentDate.getTime() - postDate.getTime();
    const days = diff / (1000 * 60 * 60 * 24);
    if (days < 1) {
      const hours = diff / (1000 * 60 * 60);
      if (hours < 1) {
        return `${Math.floor(diff / (1000 * 60))} minutes ago`;
      }
      return `${Math.floor(hours)} hours ago`;
    }
    if (days < 2) {
      return "Yesterday";
    }
    if (days < 30) {
      return `${Math.floor(days)} days ago`;
    }
    if (days < 365) {
      return `${Math.floor(days / 30)} months ago`;
    }
    return `${Math.floor(days / 365)} years ago`;
}