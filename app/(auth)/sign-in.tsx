import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Text, View } from 'react-native';

import CustomButton from '@/components/CustomButton';
import CustomInput from '@/components/CustomInput';
import { signIn } from '@/lib/appwrite';
import * as Sentry from "@sentry/react-native";

const SignIn = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });

  const router = useRouter();

  const submit = async () => {
    const {email, password} = form;

    if (!form.email || !form.password) {
      Alert.alert('Error', 'Please enter a valid email and password');
      return;
    }

    setIsSubmitting(true);
    try {

      await signIn ({ email, password});
      // Simulasi proses sign-in
      router.replace('/');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Something went wrong');
      Sentry.captureEvent(error)
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="gap-10 bg-white rounded-lg p-5 mt-5">
      <CustomInput
        placeholder="Enter your email"
        value={form.email}
        onChangeText={(text) => setForm((prev) => ({...prev, email:text}))}
        label="Email"
        keyboardType="email-address"
      />
      <CustomInput
        placeholder="Enter your password"
        value={form.password}
        onChangeText={(text) => setForm((prev) => ({...prev, password:text}))}
        label="Password"
        secureTextEntry
      />

      <CustomButton title="Sign In" onPress={submit} isLoading={isSubmitting} />

      <View className="flex justify-center mt-5 flex-row gap-2">
        <Text className="base-regular text-gray-100">Don't have an account?</Text>
        <Link href="/sign-up" className="base-bold text-primary">
          Sign up
        </Link>
      </View>
    </View>
  );
};

export default SignIn;
