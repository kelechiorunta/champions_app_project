import { GearIcon } from '@radix-ui/react-icons';
import { Button, DropdownMenu, Flex } from '@radix-ui/themes';
import Slider from '../Slider/Slider';

export default function Settings() {
  return (
    <Flex
      direction={'column'}
      gap={'8'}
      align={'center'}
      m={'auto'}
      justify={'center'}
      width={'85%'}
    >
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button variant="soft">
            <GearIcon />
            Options
            <DropdownMenu.TriggerIcon />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content side="bottom">
          <DropdownMenu.Item shortcut="⌘ E">Edit</DropdownMenu.Item>
          <DropdownMenu.Item shortcut="⌘ D">Duplicate</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item shortcut="⌘ N">Archive</DropdownMenu.Item>

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
      <Flex
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          // overflow: 'hidden',
          borderRadius: '50%',
          width: 'max-content',
          boxShadow: '2px 2px 2px 2px rgba(0,0,0,0.1)'
        }}
      >
        <Slider buttonVisible={true} />
      </Flex>
    </Flex>
  );
}
