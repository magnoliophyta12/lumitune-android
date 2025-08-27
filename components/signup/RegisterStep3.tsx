import { Region, fetchCitiesByCountryId, fetchCountries, fetchRegionById } from "@/api/regionApi";
import { isUsernameUnique, registerUser } from "@/api/userApi";
import { styles } from "@/styles/signup";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  ImageBackground,
  Pressable,
  ScrollView,
} from "react-native";
import DropDownPicker, { ItemType } from "react-native-dropdown-picker";

export default function RegisterStep3({
  onBack,
  updateForm,
  data,
}: any) {
  const router = useRouter();
  const [isArtist, setIsArtist] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const [birthDay, setBirthDay] = useState("");
  const [birthYear, setBirthYear] = useState("");

  const [birthMonthOpen, setBirthMonthOpen] = useState(false);
  const [birthMonth, setBirthMonth] = useState("");
  const [birthMonthItems, setBirthMonthItems] = useState([
    { label: "Січень", value: "01" },
    { label: "Лютий", value: "02" },
    { label: "Березень", value: "03" },
    { label: "Квітень", value: "04" },
    { label: "Травень", value: "05" },
    { label: "Червень", value: "06" },
    { label: "Липень", value: "07" },
    { label: "Серпень", value: "08" },
    { label: "Вересень", value: "09" },
    { label: "Жовтень", value: "10" },
    { label: "Листопад", value: "11" },
    { label: "Грудень", value: "12" },
  ]);

  const [countryOpen, setCountryOpen] = useState(false);
  const [country, setCountry] = useState<string>("");

  const [cityOpen, setCityOpen] = useState(false);
  const [city, setCity] = useState<string>(data.regionId || "");

  const [countries, setCountries] = useState<ItemType<string>[]>([]);
  const [cities, setCities] = useState<ItemType<string>[]>([]);

  const [errorDate, setErrorDate] = useState<string>("");
  const [errorUsername, setErrorUsername] = useState<string>("");

  useEffect(()=>{
    if(data.birthDate && data.regionId && data.username){
      setIsValid(true);
    }
    console.log(data);
    console.log(city);
    console.log(country);
  },[data]);

  const usernameCheck = async () => {
    if (!data.username.trim()) {
      setErrorUsername("");
      return;
    }

    try {
      const isUnique = await isUsernameUnique(data.username.trim());
      setErrorUsername(isUnique ? "" : "Ім’я вже зайняте. Спробуйте інше.");
    } catch (error) {
      console.error(error);
      setErrorUsername("Помилка перевірки імені. Спробуйте пізніше.");
    }
  };

  useEffect(() => {
    const loadCountries=async()=>{
      const countries:Region[]=await fetchCountries();
      const items = countries.map(region => ({
        label: region.name,
        value: region.id,
      }));
      setCountries(items);
    }
    if(countries.length === 0){
      loadCountries();
    }
    if (data.birthDate) {
      const [year, month, day] = data.birthDate.split("-");
      setBirthDay(day);
      setBirthMonth(month);
      setBirthYear(year);
    }
  }, []);

  useEffect(() => {
    const loadCities=async()=>{
      const cities:Region[]=await fetchCitiesByCountryId(country);
      const items = cities.map(region => ({
        label: region.name,
        value: region.id,
      }));
      setCities(items);
    }
    if (country) {
      loadCities();
    }
  }, [country]);

  useEffect(() => {
    if (birthYear && birthMonth && birthDay) {
      const day = birthDay.padStart(2, "0");
      const month = birthMonth.padStart(2, "0");
      const resultDate = `${birthYear}-${month}-${day}`;

      const dateObj = new Date(resultDate);
      const isValidDate =
        dateObj.getFullYear() === Number(birthYear) &&
        dateObj.getMonth() + 1 === Number(birthMonth) &&
        dateObj.getDate() === Number(birthDay);
      
      const currentYear = new Date().getFullYear();
      const minYear = 1900;
      const maxYear = currentYear - 13;
      const isValidYear = Number(birthYear) >= minYear && Number(birthYear) <= maxYear;
      
      if (isValidDate && isValidYear) {
        setErrorDate("");
        updateForm({ birthDate: resultDate });
      } else if (!isValidYear) {
        setErrorDate(`Рік має бути між ${minYear} і ${maxYear}.`);
        updateForm({ birthDate: ""});
      } else {
        setErrorDate("Невірна дата. Перевірте правильність введення");
        updateForm({ birthDate: "" });
      }
    } else {
    setErrorDate("");
  }
  }, [birthDay, birthMonth, birthYear]);

  const handleSubmit = async () => {
    const userPayload = {
      username: data.username,
      password: data.password,
      avatarId: "string",
      role: "USER" as const,
      accSubscribers: 0,
      accFollowings: 0,
      userData: {
        id: "string",
        birthDate: data.birthDate,
        regionId: data.regionId,
        isArtist: data.isArtist,
        email: data.email,
      },
    };

    try {
      await registerUser(userPayload);
      router.replace("/auth/signin");
      console.log(userPayload);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/images/common/background.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Pressable onPress={onBack} style={styles.backWrapper}>
          <View style={styles.backContainer}>
            <Text style={styles.backText}>Назад</Text>
            <View style={styles.underline} />
          </View>
        </Pressable>
        <Image
          source={require("../../assets/images/common/appLogo.png")}
          style={styles.logo}
        />

        <Text style={styles.title}>Пориньте вперше у</Text>
        <Text style={styles.title}>LumiTune</Text>
        <Text style={styles.progressBarLabel}>Крок 2 із 2</Text>
        <View style={styles.progressBar}>
          <View style={styles.progressFill} />
        </View>

        <View style={styles.formWrap}>
          <View style={styles.inputSection}>
            <Text style={styles.label}>Ім'я</Text>
            <TextInput
              style={styles.input}
              placeholder="Ім'я"
              placeholderTextColor={"rgba(147, 183, 255, 0.5)"}
              autoCapitalize="none"
              value={data.username}
              onChangeText={(text) => updateForm({ username: text })}
              onBlur={usernameCheck}
            />
            {!!errorUsername && <Text style={styles.error}>{errorUsername}</Text>}
          </View>
          <Text style={styles.dropdownTitle}>Дата народження</Text>
          <Text style={styles.dropdownDescription}>
            Для чого нам потрібна ваша дата народження?
          </Text>
          <Pressable>
            <Text style={styles.dropdownLink}>Докладніше</Text>
          </Pressable>

          <View style={styles.row}>
            <View style={[styles.column, { flex: 1 }]}>
              <TextInput
                placeholder="дд"
                placeholderTextColor="rgba(147, 183, 255, 0.5)"
                style={[styles.dropdown,styles.alignCenter]}
                keyboardType="numeric"
                value={birthDay}
                onChangeText={(text) => {
                  const numeric = text.replace(/[^0-9]/g, "").slice(0, 2);
                  setBirthDay(numeric);
                }}
              />
            </View>

            <View style={[styles.column, { flex: 2 }]}>
              <DropDownPicker
                open={birthMonthOpen}
                value={birthMonth}
                items={birthMonthItems}
                setOpen={setBirthMonthOpen}
                setValue={setBirthMonth}
                setItems={setBirthMonthItems}
                placeholder="Місяць"
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropdownContainer}
                textStyle={{ color: "rgba(147, 183, 255, 0.5)" }}
                listMode="SCROLLVIEW"
                scrollViewProps={{ nestedScrollEnabled: true }}
                ArrowDownIconComponent={() => (
                  <Image
                    source={require("../../assets/images/common/dropdownIcon.png")}
                  />
                )}
                ArrowUpIconComponent={() => (
                  <Image
                    source={require("../../assets/images/common/dropdownIcon.png")}
                  />
                )}
                showArrowIcon={true}
                arrowIconStyle={{ marginRight: 10 }}
              />
            </View>

            <View style={[styles.column, { flex: 1 }]}>
              <TextInput
                placeholder="рррр"
                placeholderTextColor="rgba(147, 183, 255, 0.5)"
                style={[styles.dropdown,styles.alignCenter]}
                keyboardType="numeric"
                value={birthYear}
                onChangeText={(text) => {
                  const numeric = text.replace(/[^0-9]/g, "").slice(0, 4);
                  setBirthYear(numeric);
                }}
              />
            </View>
          </View>

          <Text style={[styles.dropdownTitle, { marginTop: 24 }]}>
            Регіон проживання
          </Text>
          <Text style={styles.dropdownDescription}>
            Для чого нам потрібна ваше місце проживання?
          </Text>
          <Pressable>
            <Text style={styles.dropdownLink}>Докладніше</Text>
          </Pressable>

          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>Країна</Text>
              <DropDownPicker
                open={countryOpen}
                value={country}
                items={countries}
                setOpen={setCountryOpen}
                setValue={setCountry}
                setItems={setCountries}
                placeholder="Країна"
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropdownContainer}
                textStyle={{ color: "rgba(147, 183, 255, 0.5)" }}
                listMode="SCROLLVIEW"
                scrollViewProps={{
                  nestedScrollEnabled: true,
                }}
                ArrowDownIconComponent={() => (
                  <Image
                    source={require("../../assets/images/common/dropdownIcon.png")}
                  />
                )}
                ArrowUpIconComponent={() => (
                  <Image
                    source={require("../../assets/images/common/dropdownIcon.png")}
                  />
                )}
                showArrowIcon={true}
                arrowIconStyle={{ marginRight: 10 }}
              />
            </View>

            <View style={styles.column}>
              <Text style={styles.label}>Місто</Text>
              <DropDownPicker
                open={cityOpen}
                value={city}
                items={cities}
                setOpen={setCityOpen}
                setValue={setCity}
                onChangeValue={(value) => {
                  updateForm({ regionId: value })
                }}
                setItems={setCities}
                placeholder="Місто"
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropdownContainer}
                textStyle={{ color: "rgba(147, 183, 255, 0.5)" }}
                listMode="SCROLLVIEW"
                scrollViewProps={{
                  nestedScrollEnabled: true,
                }}
                ArrowDownIconComponent={() => (
                  <Image
                    source={require("../../assets/images/common/dropdownIcon.png")}
                  />
                )}
                ArrowUpIconComponent={() => (
                  <Image
                    source={require("../../assets/images/common/dropdownIcon.png")}
                  />
                )}
                showArrowIcon={true}
                arrowIconStyle={{ marginRight: 10 }}
              />
            </View>
          </View>

          <View style={styles.rulesSection}>
            <Text style={styles.rulesTitle}>Хто ви?</Text>
            <View>
              <Pressable style={styles.item} onPress={() => {setIsArtist(false); updateForm({ isArtist: false })}}>
                <View
                  style={[styles.circle, !isArtist && styles.circleActive]}
                />
                <Text style={[styles.itemText, !isArtist && styles.textActive]}>
                  Я звичайний користувач
                </Text>
              </Pressable>

              <Pressable style={styles.item} onPress={() => {setIsArtist(true); updateForm({ isArtist: true })}}>
                <View
                  style={[styles.circle, isArtist && styles.circleActive]}
                />
                <Text style={[styles.itemText, isArtist && styles.textActive]}>
                  Я автор
                </Text>
              </Pressable>
            </View>
          </View>
        </View>

        <Pressable
          style={[styles.nextButton, !isValid && styles.disabledButton]}
          onPress={handleSubmit}
          disabled={!isValid}
        >
          <Text style={styles.nextButtonText}>Зареєструватися</Text>
        </Pressable>
      </ScrollView>
    </ImageBackground>
  );
}
