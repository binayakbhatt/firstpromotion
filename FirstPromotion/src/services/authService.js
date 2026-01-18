// src/services/authService.js

export const requestPasswordReset = async (email) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Mock Validation
  if (!email.includes("@")) {
    throw new Error("Please enter a valid email address.");
  }

  // Simulate success
  return { success: true, message: "OTP sent to your email." };
};

export const confirmPasswordReset = async ({ email, otp, newPassword }) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  if (otp !== "1234") {
    // Mock OTP check
    throw new Error("Invalid OTP. Please try again.");
  }

  if (newPassword.length < 6) {
    throw new Error("Password must be at least 6 characters.");
  }

  return { success: true, message: "Password reset successfully." };
};
