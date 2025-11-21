import { DotsVerticalIcon } from '@radix-ui/react-icons';
import { Button, DropdownMenu, Text } from '@radix-ui/themes';

export default function ActionPopOverAdmin() {
  const handleLogout = () => {
    try {
      window.location.href = 'proxy/auth/logout';
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button style={{ cursor: 'pointer' }} variant="soft">
          <DotsVerticalIcon width="16" height="16" />
          <Text truncate size={'2'}>
            Admin
          </Text>
          <DropdownMenu.TriggerIcon />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content side="bottom">
        <DropdownMenu.Item shortcut="⌘ E">Change Profile</DropdownMenu.Item>
        <DropdownMenu.Item shortcut="⌘ D">Duplicate</DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item onClick={handleLogout} shortcut="⌘ Q">
          Logout
        </DropdownMenu.Item>

        {/* <DropdownMenu.Sub>
                <DropdownMenu.SubTrigger>More</DropdownMenu.SubTrigger>
                <DropdownMenu.SubContent>
                  <DropdownMenu.Item>Move to project…</DropdownMenu.Item>
                  <DropdownMenu.Item>Move to folder…</DropdownMenu.Item>
      
                  <DropdownMenu.Separator />
                  <DropdownMenu.Item>Advanced options…</DropdownMenu.Item>
                </DropdownMenu.SubContent>
              </DropdownMenu.Sub> */}

        {/* <DropdownMenu.Separator />
              <DropdownMenu.Item>Share</DropdownMenu.Item>
              <DropdownMenu.Item>Add to favorites</DropdownMenu.Item>
              <DropdownMenu.Separator />
              <DropdownMenu.Item shortcut="⌘ ⌫" color="red">
                Delete
              </DropdownMenu.Item> */}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
