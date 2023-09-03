export const convertTimestamp = (timeProps: any) => {
  let date = timeProps;
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();

  month = String(month).padStart(2, "0");
  day = String(day).padStart(2, "0");
  hour = String(hour).padStart(2, "0");
  minute = String(minute).padStart(2, "0");
  second = String(second).padStart(2, "0");
  
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

export const convertDate = (timeProps: any) => {
  let date = timeProps;
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  month = String(month).padStart(2, "0");
  day = String(day).padStart(2, "0");
  
  return `${year}-${month}-${day}`;
};

export const removeHtmlTags = (text: string) => {
  return text.replace(/<\/?[^>]+(>|$)/g, "")
};

export const cls = (...classnames: string[]) => {
  return classnames.join(" ");
}

export const getFirstImage = (content: string) => {
  const regex = /<img[^>]+src="([^"]+)">/;
  const match = content.match(regex);
  if (match) {
    return match[0];
  } else {
    return "";
  }
};

export const getImgUrl = (imgMarkup: string) => {
  const regex = /<img src="(.*?)">/;
  const match = imgMarkup.match(regex);
  if (match) {
    return match[1];
  } else {
    return "";
  }
}