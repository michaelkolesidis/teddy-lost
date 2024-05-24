export function setupText(element: HTMLButtonElement) {
  let activeText = ``;
  let text = `Hi!`;

  const setText = (text: string) => {
    activeText = text;
    element.innerHTML = `TEDDY: ${activeText}`;
  };
  element.addEventListener('click', () => setText(text));
  setText(``);
}
