export function StatusTrue() {
  return (
    <div className="w-[126px] bg-white px-4 flex gap-5 justify-between items-center py-2 rounded-full">
      <div className="w-3 h-3 rounded-full bg-kiwi"></div>
      <div className="text-kiwi font-bold">Solved</div>
    </div>
  );
}

export function StatusFalse() {
  return (
    <div className="w-[126px] bg-white px-4 flex gap-5 justify-between items-center py-2 rounded-full">
      <div className="w-3 h-3 rounded-full bg-[#DF9292]"></div>
      <div className="text-[#DF9292] font-bold">Not Sloved</div>
    </div>
  );
}
