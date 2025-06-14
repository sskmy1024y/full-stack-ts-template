import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'

import { trpc } from '../lib/api/trpc/client'

export default function RegisterScreen() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const registerMutation = trpc.user.register.useMutation({
    onSuccess: () => {
      Alert.alert('Success', 'Account created successfully! You can now sign in.', [
        { text: 'OK', onPress: () => router.replace('/login') },
      ])
    },
    onError: (error: any) => {
      Alert.alert('Registration Failed', error.message)
    },
  })

  const handleRegister = () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields')
      return
    }
    if (password.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters long')
      return
    }
    registerMutation.mutate({ name, email, password })
  }

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <StatusBar style="dark" />

      {/* Background shapes */}
      <View className="absolute inset-0 overflow-hidden">
        <View className="absolute -top-40 -left-32 w-96 h-96 rounded-full bg-pink-400 opacity-20" />
        <View className="absolute -bottom-40 -right-32 w-96 h-96 rounded-full bg-indigo-400 opacity-20" />
        <View className="absolute top-1/3 right-1/3 w-48 h-48 rounded-full bg-yellow-400 opacity-10" />
      </View>

      <View className="flex-1 justify-center px-6">
        {/* Header */}
        <View className="items-center mb-12">
          <View className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-600 rounded-3xl items-center justify-center mb-6 shadow-lg">
            <Ionicons name="person-add" size={32} color="white" />
          </View>
          <Text className="text-4xl font-bold text-gray-900 mb-2">Join Us Today</Text>
          <Text className="text-gray-600 text-lg">Create your account in seconds</Text>
        </View>

        {/* Form */}
        <View className="space-y-5">
          {/* Name Input */}
          <View>
            <View className="relative">
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Full name"
                autoCapitalize="words"
                autoComplete="name"
                className="w-full px-4 py-4 bg-white/70 border border-gray-200/50 rounded-2xl text-base backdrop-blur-sm"
                style={{ paddingRight: 50 }}
              />
              <View className="absolute right-4 top-4">
                <Ionicons name="person-outline" size={20} color="#9CA3AF" />
              </View>
            </View>
          </View>

          {/* Email Input */}
          <View>
            <View className="relative">
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Email address"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                className="w-full px-4 py-4 bg-white/70 border border-gray-200/50 rounded-2xl text-base backdrop-blur-sm"
                style={{ paddingRight: 50 }}
              />
              <View className="absolute right-4 top-4">
                <Ionicons name="mail-outline" size={20} color="#9CA3AF" />
              </View>
            </View>
          </View>

          {/* Password Input */}
          <View>
            <View className="relative">
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Password (8+ characters)"
                secureTextEntry={!showPassword}
                autoComplete="password-new"
                className="w-full px-4 py-4 bg-white/70 border border-gray-200/50 rounded-2xl text-base backdrop-blur-sm"
                style={{ paddingRight: 50 }}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-4"
              >
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color="#9CA3AF"
                />
              </TouchableOpacity>
            </View>
            <Text className="mt-2 text-xs text-gray-500 px-2">
              Choose a strong password with at least 8 characters
            </Text>
          </View>

          {/* Create Account Button */}
          <TouchableOpacity
            onPress={handleRegister}
            disabled={registerMutation.isPending}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-lg"
            style={{
              opacity: registerMutation.isPending ? 0.5 : 1,
            }}
          >
            <View className="flex-row items-center justify-center space-x-2">
              {registerMutation.isPending ? (
                <>
                  <ActivityIndicator color="white" size="small" />
                  <Text className="text-white font-semibold text-lg ml-2">Creating account...</Text>
                </>
              ) : (
                <>
                  <Text className="text-white font-semibold text-lg">Create Account</Text>
                  <Ionicons name="add" size={20} color="white" />
                </>
              )}
            </View>
          </TouchableOpacity>
        </View>

        {/* Divider */}
        <View className="my-8">
          <View className="relative">
            <View className="absolute inset-0 flex items-center">
              <View className="w-full h-px bg-gray-300/50" />
            </View>
            <View className="relative flex justify-center">
              <Text className="px-4 bg-white/80 text-gray-500 rounded-full">
                Already have an account?
              </Text>
            </View>
          </View>
        </View>

        {/* Login Link */}
        <TouchableOpacity
          onPress={() => router.push('/login')}
          className="w-full flex-row items-center justify-center py-3 px-6 border-2 border-gray-300/50 rounded-2xl bg-white/50 space-x-2"
        >
          <Text className="text-gray-700 font-medium text-lg">Sign in instead</Text>
          <Ionicons name="log-in-outline" size={20} color="#374151" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
