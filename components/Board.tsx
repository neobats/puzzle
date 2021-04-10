import React from 'react';
import {
  StyleSheet
} from 'react-native';
import { Puzzle } from '../types';

type Props = {
  puzzle: Puzzle
  teardown: boolean
  image: { uri: string} | null
  previousMove: number | null,
  onMoveSquare: () => void
  onTransitionIn: () => void
  onTransitionOut: () => void
};


export const Board: React.FC<Props> = (_props) => {
    return null;
}

Board.defaultProps = {
  image: null,
  previousMove: null
}

const _styles = StyleSheet.create({
  container: {
    padding: 6,
    borderRadius: 6,
    backgroundColor: '#1F1E2A',
  },
  title: {
    fontSize: 24,
    color: '#69B8FF',
  },
});
