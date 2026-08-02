import { EnterButton } from '../common/button/EnterButton';
import { Input } from '../common/input/Input';
import { Select } from '../common/select/ActionBarSelect.tsx';
import { SKIN_SYSTEMS, type SkinSystem } from '../../types';
import { useEffect, useState } from 'react';
import './NicknameRow.css';

interface NicknameRowProps {
  skinSystem: SkinSystem;
  nickname: string;
  setSkinSystem: (value: SkinSystem) => void;
  setNickname: (value: string) => void;
}

export function NicknameRow({
  skinSystem,
  nickname,
  setSkinSystem,
  setNickname,
}: NicknameRowProps) {
  const [value, setValue] = useState(nickname);
  const onEnter = () => {
    setNickname(value.trim());
  };
  useEffect(() => {
    setValue(nickname);
  }, [nickname]);

  return (
    <div className="nickname-wrap">
      <Select
        value={skinSystem}
        options={SKIN_SYSTEMS}
        onChange={e => setSkinSystem(e.target.value as SkinSystem)}
      />
      <Input value={value} setValue={setValue} onEnter={onEnter} />
      <EnterButton onClick={onEnter} />
    </div>
  );
}
