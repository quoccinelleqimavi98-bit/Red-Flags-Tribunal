import React from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors, radius, spacing, typography } from "@core/theme";
import { Button } from "./Button";

interface SipEventModalProps {
  visible: boolean;
  emoji: string;
  title: string;
  description: string;
  onClose: () => void;
}

export function SipEventModal({
  visible,
  emoji,
  title,
  description,
  onClose,
}: SipEventModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <LinearGradient
          colors={colors.gradientDanger}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.card}
        >
          <Text style={styles.emoji}>{emoji}</Text>
          <Text style={[typography.title, styles.title]}>{title}</Text>
          <Text style={[typography.body, styles.description]}>
            {description}
          </Text>
          <Button label="C'est parti !" onPress={onClose} variant="gold" />
        </LinearGradient>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.lg,
  },
  card: {
    width: "100%",
    borderRadius: radius.lg,
    padding: spacing.xl,
    alignItems: "center",
  },
  emoji: {
    fontSize: 56,
    marginBottom: spacing.sm,
  },
  title: {
    color: "#1a0a2e",
    textAlign: "center",
    marginBottom: spacing.sm,
  },
  description: {
    color: "#1a0a2e",
    textAlign: "center",
    marginBottom: spacing.lg,
  },
});
