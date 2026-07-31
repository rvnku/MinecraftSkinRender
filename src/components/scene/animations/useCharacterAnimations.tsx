import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';
import type { Animation } from '../../../types';

export interface AnimationRefs {
  head: React.RefObject<Group>;
  body: React.RefObject<Group>;
  rightArm: React.RefObject<Group>;
  leftArm: React.RefObject<Group>;
  rightLeg: React.RefObject<Group>;
  leftLeg: React.RefObject<Group>;
}

export function useCharacterAnimation(animation: Animation, refs: AnimationRefs) {
  const time = useRef(0);
  const initialPositions = useRef({
    bodyY: 0,
    headY: 0,
    rightArmY: 0,
    leftArmY: 0,
    rightLegY: 0,
    leftLegY: 0,
  });
  const initialized = useRef(false);

  useFrame((_, delta) => {
    time.current += delta;
    const t = time.current;

    const { head, body, rightArm, leftArm, rightLeg, leftLeg } = refs;

    if (
      !head.current ||
      !body.current ||
      !rightArm.current ||
      !leftArm.current ||
      !rightLeg.current ||
      !leftLeg.current
    ) {
      return;
    }

    if (!initialized.current) {
      initialPositions.current = {
        bodyY: body.current.position.y,
        headY: head.current.position.y,
        rightArmY: rightArm.current.position.y,
        leftArmY: leftArm.current.position.y,
        rightLegY: rightLeg.current.position.y,
        leftLegY: leftLeg.current.position.y,
      };
      initialized.current = true;
    }

    const reset = () => {
      head.current!.rotation.set(0, 0, 0);
      body.current!.rotation.set(0, 0, 0);
      rightArm.current!.rotation.set(0, 0, 0);
      leftArm.current!.rotation.set(0, 0, 0);
      rightLeg.current!.rotation.set(0, 0, 0);
      leftLeg.current!.rotation.set(0, 0, 0);

      head.current!.position.y = initialPositions.current.headY;
      body.current!.position.y = initialPositions.current.bodyY;
      rightArm.current!.position.y = initialPositions.current.rightArmY;
      leftArm.current!.position.y = initialPositions.current.leftArmY;
      rightLeg.current!.position.y = initialPositions.current.rightLegY;
      leftLeg.current!.position.y = initialPositions.current.leftLegY;
    };

    switch (animation) {
      case 'idle': {
        reset();
        head.current.rotation.x = Math.sin(t * 0.5) * 0.04;
        head.current.rotation.z = Math.sin(t * 0.3 + 1) * 0.03;
        body.current.rotation.z = Math.sin(t * 0.4) * 0.02;
        rightArm.current.rotation.x = Math.sin(t * 0.6 + 0.5) * 0.04;
        leftArm.current.rotation.x = Math.sin(t * 0.6 + 2) * 0.04;
        rightLeg.current.rotation.x = Math.sin(t * 0.5 + 1) * 0.02;
        leftLeg.current.rotation.x = Math.sin(t * 0.5 + 3) * 0.02;
        break;
      }

      case 'walking': {
        reset();
        const speed = 4.5;
        const amp = 0.6;
        rightArm.current.rotation.x = Math.sin(t * speed) * amp;
        leftLeg.current.rotation.x = Math.sin(t * speed) * amp;
        leftArm.current.rotation.x = Math.sin(t * speed + Math.PI) * amp;
        rightLeg.current.rotation.x = Math.sin(t * speed + Math.PI) * amp;
        body.current.rotation.z = Math.sin(t * speed * 0.5) * 0.03;
        head.current.rotation.x = Math.sin(t * speed * 0.5) * 0.05;
        break;
      }

      case 'running': {
        reset();
        const speedR = 7.5;
        const ampR = 0.9;
        body.current.rotation.x = 0.2;
        rightArm.current.rotation.x = Math.sin(t * speedR) * ampR;
        leftLeg.current.rotation.x = Math.sin(t * speedR) * ampR;
        leftArm.current.rotation.x = Math.sin(t * speedR + Math.PI) * ampR;
        rightLeg.current.rotation.x = Math.sin(t * speedR + Math.PI) * ampR;
        rightArm.current.rotation.z = Math.sin(t * speedR) * 0.15;
        leftArm.current.rotation.z = Math.sin(t * speedR + Math.PI) * 0.15;
        body.current.rotation.z = Math.sin(t * speedR * 0.5) * 0.05;
        head.current.rotation.x = Math.sin(t * speedR * 0.5) * 0.08;
        break;
      }

      case 'waving': {
        reset();
        const speedW = 5.5;

        rightArm.current.rotation.x = Math.PI;
        rightArm.current.rotation.z = Math.sin(t * speedW) * 0.4 - 0.8;
        rightArm.current.rotation.y = Math.sin(t * speedW * 0.5) * 0.1;

        leftArm.current.rotation.x = 0.2;
        leftArm.current.rotation.z = -0.3;
        leftArm.current.rotation.y = 0.1;

        body.current.rotation.z = -0.08 + Math.sin(t * speedW * 0.3) * 0.02;
        body.current.rotation.y = Math.sin(t * speedW * 0.2) * 0.05;

        head.current.rotation.y = -0.25 + Math.sin(t * speedW * 0.4) * 0.03;
        head.current.rotation.x = Math.sin(t * speedW * 0.3) * 0.04;

        rightLeg.current.rotation.x = -0.05;
        leftLeg.current.rotation.x = 0.05;
        break;
      }

      case 'stand':
      default:
        reset();
        break;
    }
  });
}
