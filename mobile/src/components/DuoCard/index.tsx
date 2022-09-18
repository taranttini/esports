import { TouchableOpacity, View, Text } from "react-native";
import { GameController } from "phosphor-react-native";

import { DuoInfo } from "../DuoInfo";

import { THEME } from "../../theme";
import { styles } from "./styles";

export interface DuoCardProps {
  id: string;
  hourEnd: string;
  hourStart: string;
  name: string;
  useVoiceChannel: boolean;
  weekDays: string[];
  yearsPlaying: Number;
}

interface Props {
  data: DuoCardProps;
  onConnect: () => void;
}
export function DuoCard({ data, onConnect }: Props) {
  const plural = (value: boolean) => {
    return value ? "s" : "";
  };

  const tempoJogando = () =>
    `${data.yearsPlaying} ano${plural(data.yearsPlaying > 1)}`;

  const disponivelDias = () =>
    `${data.weekDays.length} dia${plural(data.weekDays.length > 1)}`;

  const disponivelHoras = () => `${data.hourStart}h - ${data.hourEnd}h`;

  return (
    <View style={styles.container}>
      <DuoInfo label="Nome" value={data.name} />
      <DuoInfo label="Tempo de Jogo" value={tempoJogando()} />
      <DuoInfo
        label="Disponibilidade"
        value={`${disponivelDias()} \u2022 ${disponivelHoras()}`}
      />
      <DuoInfo
        label="Chamada de áudio?"
        value={data.useVoiceChannel ? "Sim" : "Não"}
        colorValue={
          data.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT
        }
      />

      <TouchableOpacity style={styles.button} onPress={onConnect}>
        <GameController color={THEME.COLORS.TEXT} size={20} />
        <Text style={styles.buttonTitle}>Conectar</Text>
      </TouchableOpacity>
    </View>
  );
}
