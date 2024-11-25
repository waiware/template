export const formatSecondsToDisplayTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const hourString = hours > 0 ? `${hours}時間` : '';
  const minuteString = minutes > 0 ? `${minutes}分` : '';
  const secondString = remainingSeconds > 0 ? `${remainingSeconds}秒` : '';

  // フォーマットされた文字列を返す
  return `${hourString}${minuteString}${secondString}`;
};
