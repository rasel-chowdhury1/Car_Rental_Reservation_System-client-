const getCurrentDateTime = (): { date: string; currentTime: string } => {
    const currentDate = new Date();
  
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const date = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  
    const formattedDate = `${year}-${month}-${date}`;
    const formattedTime = `${hours}:${minutes}`;
  
    return {
      date: formattedDate,
      currentTime: formattedTime,
    };
  };
  
  export default getCurrentDateTime;