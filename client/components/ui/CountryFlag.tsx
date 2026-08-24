import { Text, View } from "react-native";

type CountryFlagProps = {
  code: string;
  size?: number;
};

const REGIONAL_INDICATOR_A = 0x1f1e6;
const LETTER_A = 65;

/**
 * Cờ quốc gia vẽ bằng emoji suy ra từ mã ISO thay vì nhúng 248 file SVG (~4 MB)
 * vào JS bundle của app. Máy nào thiếu font emoji cờ sẽ hiện hai chữ cái mã nước,
 * vẫn đủ để nhận ra quốc gia.
 */
export function countryFlagEmoji(code: string): string {
  const letters = code.trim().toUpperCase();
  if (!/^[A-Z]{2}$/.test(letters)) return "🏳";

  return String.fromCodePoint(
    ...[...letters].map((letter) => REGIONAL_INDICATOR_A + (letter.charCodeAt(0) - LETTER_A)),
  );
}

export default function CountryFlag({ code, size = 20 }: CountryFlagProps) {
  return (
    <View className="items-center justify-center overflow-hidden rounded-full bg-white/10" style={{ height: size, width: size * 1.15 }}>
      <Text style={{ fontSize: size * 0.92, lineHeight: size * 1.1 }}>{countryFlagEmoji(code)}</Text>
    </View>
  );
}
