import { Header } from '@components/header';
import { Highlight } from '@components/Highlight';
import { useCallback, useEffect, useState } from 'react';
import { GroupCard } from '@components/GroupCard';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { Container } from './styles';
import { Alert, FlatList } from 'react-native';
import { Button } from '@components/Button';
import { ListEmpty } from '@components/ListEmpty';
import { groupsGetAll } from '@storage/group/groupGetAll';


export function Groups() {
  const [groups, setGroups] = useState<string[]>([])

  const navigation = useNavigation();
 
  function handleNewGroup(){
    navigation.navigate('new')
  }

  async function fetchGroups() {
    try{
      const data = await groupsGetAll();
      setGroups(data)
    } catch (error){
      console.log(error)
      Alert.alert('Turmas', 'Não foi possível carregar as turmas')
    } finally {
    
    }
  }


  function handleOpenGroup(group: string){
    navigation.navigate('players', {group})
  }

  useFocusEffect (useCallback((  ) => {
    fetchGroups();
  },[]));

  return (
    <Container>
      <Header />
      <Highlight
        title='Turmas'
        subtitle='jogue com a sua turma' />

      <FlatList
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <GroupCard
            title={item}
            onPress={() => handleOpenGroup(item)}
          />
        )}
        contentContainerStyle={groups.length === 0 && {flex: 1}}
        ListEmptyComponent={() => <ListEmpty message='Que tal cadastrar a primeira turma?'/>}
      />
        <Button
        title='Criar nova turma'
        onPress={handleNewGroup}
        />
    </Container>
  );
}
