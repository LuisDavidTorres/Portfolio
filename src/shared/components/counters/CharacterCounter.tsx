type props = {
  characters: number;
  requiredCharacters: number;
};

export default function CharacterCounter({
  characters,
  requiredCharacters,
}: props) {
  return (
    <div className="text-xs text-gray-400 flex justify-end">
      {characters}/{requiredCharacters}
    </div>
  );
}
