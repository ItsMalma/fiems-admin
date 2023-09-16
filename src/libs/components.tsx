type DebugProps = {
  run: () => void;
};

export function Debug(props: DebugProps) {
  props.run();

  return <></>;
}
