import { Side, Seconds } from './types'; 
function toDurationString(seconds: Seconds): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s < 10 ? "0" : ""}${s}`;
}
function otherSide(side: Side) {
  return (side === Side.Top ? Side.Bottom : Side.Top);
}
export { toDurationString, otherSide };
