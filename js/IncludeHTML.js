export const IncludeHTML = async (file, target) => {
  try {
    const response = await fetch(file);
    if (!response.ok) {
      console.error('네트워크 반응 오류');
    }
    const HTML = await response.text();
    document.querySelector(target).innerHTML = HTML;
  } catch (error) {
    console.log(error);
  }
};
