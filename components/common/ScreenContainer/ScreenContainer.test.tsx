import { Button, Text } from 'react-native';

import { render, screen, userEvent } from '@testing-library/react-native';

import { ScreenContainer } from 'components';

describe('ScreenContainer', () => {
  it('renders the title correctly', () => {
    const title = 'Test Title';

    render(
      <ScreenContainer title={title}>
        <Text>Child content</Text>
      </ScreenContainer>,
    );

    expect(screen.getByText(title)).toBeTruthy();
  });

  it('back button calls custom back action', async () => {
    const title = 'Test Title';

    const backActionMock = jest.fn();
    const user = userEvent.setup();

    render(
      <ScreenContainer title={title} isBackButton customBackAction={backActionMock}>
        <Text>Child content</Text>
      </ScreenContainer>,
    );

    await user.press(screen.getByRole('button'));

    expect(backActionMock).toHaveBeenCalledTimes(1);
  });

  it('left action is present and calls custom action', async () => {
    const title = 'Test Title';

    const leftActionMock = jest.fn();
    const user = userEvent.setup();

    render(
      <ScreenContainer title={title} leftActionIcon="text" leftAction={leftActionMock}>
        <Text>Child content</Text>
      </ScreenContainer>,
    );

    await user.press(screen.getByRole('button'));

    expect(leftActionMock).toHaveBeenCalledTimes(1);
  });

  it('right action is present and calls custom action', async () => {
    const title = 'Test Title';

    const rightActionMock = jest.fn();
    const user = userEvent.setup();

    render(
      <ScreenContainer title={title} rightActionIcon="text" rightAction={rightActionMock}>
        <Text>Child content</Text>
      </ScreenContainer>,
    );

    await user.press(screen.getByRole('button'));

    expect(rightActionMock).toHaveBeenCalledTimes(1);
  });

  it('right action element is rendered and calls custom action', async () => {
    const title = 'Test Title';

    const rightElementActionMock = jest.fn();
    const element = <Button title={title} onPress={rightElementActionMock} />;

    const user = userEvent.setup();

    render(
      <ScreenContainer title={title} rightActionElement={element}>
        <Text>Child content</Text>
      </ScreenContainer>,
    );

    await user.press(screen.getByRole('button'));

    expect(rightElementActionMock).toHaveBeenCalledTimes(1);
  });
});
