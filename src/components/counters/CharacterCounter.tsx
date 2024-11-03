type props = {
  characters: number;
  requiredCharacters: number;
};

export default function CharacterCounter({
  characters,
  requiredCharacters,
}: props) {
  return (
    <div className="absolute top-0 right-0 text-xs text-gray-500 p-2">
      {characters}/{requiredCharacters}
    </div>
  );
}
