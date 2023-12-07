export const convertDate = (date) => {
  const dateObj = new Date(date);

  const year = dateObj.getFullYear();
  const month = ("0" + (dateObj.getMonth() + 1)).slice(-2); // Thêm '0' ở đầu và chỉ lấy hai chữ số
  const day = ("0" + dateObj.getDate()).slice(-2);
  const hours = ("0" + dateObj.getHours()).slice(-2);
  const minutes = ("0" + dateObj.getMinutes()).slice(-2);

  return year + "-" + month + "-" + day + " " + hours + ":" + minutes;
};
