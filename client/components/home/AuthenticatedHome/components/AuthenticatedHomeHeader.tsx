import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Heart } from "lucide-react-native";
import { Text, TextInput, View } from "react-native";

import aloboIcons from "@/components/assets/icons";
import images from "@/components/assets/images";
import Touch from "@/components/ui/Pressable";
import { shadow } from "@/components/ui/theme";

type AuthenticatedHomeHeaderProps = {
  avatarInitial: string;
  date: string;
  name: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder: string;
  searchValue: string;
};

export default function AuthenticatedHomeHeader({
  avatarInitial,
  date,
  name,
  onSearchChange,
  searchPlaceholder,
  searchValue,
}: AuthenticatedHomeHeaderProps) {
  const router = useRouter();

  return (
    <View className="h-[132px] bg-[#087442]">
      <Image
        contentFit="cover"
        source={images.alobo.homeHeader}
        style={{ bottom: 0, left: 0, opacity: 0.75, position: "absolute", right: 0, top: 0 }}
      />

      <View className="px-4 pt-4">
        <View className="flex-row items-center gap-3">
          <View className="h-14 w-14 items-center justify-center rounded-full bg-[#666bd5]">
            <Text className="text-[30px] font-light uppercase text-white">{avatarInitial}</Text>
          </View>
          <View className="flex-1">
            <Text className="text-[13px] text-white">{date}</Text>
            <Text className="mt-2 text-[16px] font-bold text-[#ffe049]">{name}</Text>
          </View>
          <Touch accessibilityLabel="Thông báo" className="rounded-full p-2" onPress={() => router.push("/notifications")}>
            <aloboIcons.notification color="#ffffff" height={20} width={20} />
          </Touch>
        </View>
      </View>

      <View
        className="absolute inset-x-4 bottom-0 h-11 flex-row items-center rounded-lg bg-white pl-3"
        style={shadow.raised}
      >
        <Text className="mr-2 text-[#00a85a]">◉</Text>
        <TextInput
          className="min-w-0 flex-1 text-[15px] text-[#134832]"
          onChangeText={onSearchChange}
          placeholder={searchPlaceholder}
          placeholderTextColor="#a5aaa7"
          value={searchValue}
        />
        <View className="border-l border-[#eef2f0] px-3">
          <aloboIcons.filter color="#134832" height={20} width={20} />
        </View>
        <View className="border-l border-[#eef2f0] px-3">
          <Heart color="#006b3d" size={21} />
        </View>
      </View>
    </View>
  );
}
