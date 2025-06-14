import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'

import { trpc } from '../lib/api/trpc/client'

export default function LoginScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const loginMutation = trpc.user.login.useMutation({
    onSuccess: (data: any) => {
      Alert.alert('Success', `Welcome back, ${data.email}!`, [
        { text: 'OK', onPress: () => router.replace('/(tabs)') },
      ])
    },
    onError: (error: any) => {
      Alert.alert('Login Failed', error.message)
    },
  })

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields')
      return
    }
    loginMutation.mutate({ email, password })
  }

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      <StatusBar style="dark" />

      {/* Background shapes */}
      <View className="absolute inset-0 overflow-hidden">
        <View className="absolute -top-40 -right-32 w-96 h-96 rounded-full bg-purple-400 opacity-20" />
        <View className="absolute -bottom-40 -left-32 w-96 h-96 rounded-full bg-blue-400 opacity-20" />
        <View className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-cyan-400 opacity-10" />
      </View>

      <View className="flex-1 justify-center px-6">
        {/* Header */}
        <View className="items-center mb-12">
          <View className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl items-center justify-center mb-6 shadow-lg">
            <Ionicons name="person" size={32} color="white" />
          </View>
          <Text className="text-4xl font-bold text-gray-900 mb-2">Welcome Back</Text>
          <Text className="text-gray-600 text-lg">Sign in to continue to your dashboard</Text>
        </View>

        {/* Form */}
        <View className="space-y-6">
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
                placeholder="Password"
                secureTextEntry={!showPassword}
                autoComplete="password"
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
          </View>

          {/* Sign In Button */}
          <TouchableOpacity
            onPress={handleLogin}
            disabled={loginMutation.isPending}
            className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-lg"
            style={{
              opacity: loginMutation.isPending ? 0.5 : 1,
            }}
          >
            <View className="flex-row items-center justify-center space-x-2">
              {loginMutation.isPending ? (
                <>
                  <ActivityIndicator color="white" size="small" />
                  <Text className="text-white font-semibold text-lg ml-2">Signing in...</Text>
                </>
              ) : (
                <>
                  <Text className="text-white font-semibold text-lg">Sign In</Text>
                  <Ionicons name="arrow-forward" size={20} color="white" />
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
                Don&apos;t have an account?
              </Text>
            </View>
          </View>
        </View>

        {/* Register Link */}
        <TouchableOpacity
          onPress={() => router.push('/register')}
          className="w-full flex-row items-center justify-center py-3 px-6 border-2 border-gray-300/50 rounded-2xl bg-white/50 space-x-2"
        >
          <Text className="text-gray-700 font-medium text-lg">Create new account</Text>
          <Ionicons name="person-add-outline" size={20} color="#374151" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
