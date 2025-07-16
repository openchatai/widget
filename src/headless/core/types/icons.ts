import { icons } from 'lucide';
import type { SafeExtract } from './helpers';

export type IconNameU = SafeExtract<
  keyof typeof icons,
  /* ------------------------- <-> ------------------------ */
  | 'Maximize'
  | 'Maximize2'
  | 'Minimize'
  | 'Minimize2'
  | 'Expand'
  | 'Shrink'
  /* -------------------------- X ------------------------- */
  | 'X'
  | 'SquareX'
  | 'CircleX'
  /* -------------------------- ✅ ------------------------- */
  | 'Check'
  | 'CheckCheck'
  | 'CircleCheck'
  | 'CircleCheckBig'
  | 'SquareCheck'
  | 'SquareCheckBig'
>;
