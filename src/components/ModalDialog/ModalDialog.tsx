import { BackpackIcon } from '@radix-ui/react-icons';
import { AlertDialog, Button } from '@radix-ui/themes';
import React from 'react';
// import type { formProps } from '../Products/ViewProduct';

export interface ModalProps {
  component?: React.ReactNode;
  title?: string;
  button_label?: string;
  description?: string;
  handleSubmit?: () => void;
}

export default function ModalDialog({
  title,
  component,
  button_label,
  description,
//   handleSubmit
}: ModalProps) {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button variant="soft">
          <BackpackIcon />
          {button_label}
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content maxWidth="550px" style={{ marginTop: -15 }}>
        <AlertDialog.Title>{title}</AlertDialog.Title>
        <AlertDialog.Description size="2">{description}</AlertDialog.Description>
        {component}
        {/*  */}
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
