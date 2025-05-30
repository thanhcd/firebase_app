import { View, Text, TextInput, Image, TextInputProps } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";

interface FormFieldsProps {
  title: string;
  value: string;
  placeholder?: string;
  handleChangeText: (text: string) => void;
  otherStyles?: string;
  icons?: any;
}

const FormFields: React.FC<FormFieldsProps> = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles = "",
  icons,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-3 ${otherStyles}`}>
      <View className="w-full bg-white focus:border-secondary items-center flex-row">
        <Image source={icons} />
        <View className="flex flex-row justify-between items-center">
          <TextInput
            className="flex-1 text-base font-poppins-regular p-2"
            value={value}
            placeholder={placeholder}
            placeholderTextColor="#B0B0B0"
            onChangeText={handleChangeText}
            secureTextEntry={title === "Password" && !showPassword}
          />
          {/* {title === "Password" && (
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Text className="text-blue-500 text-sm ">
                {showPassword ? "Ẩn" : "Hiện"}
              </Text>
            </TouchableOpacity>
          )} */}
        </View>

      </View>
    </View>
  );
};

export default FormFields;