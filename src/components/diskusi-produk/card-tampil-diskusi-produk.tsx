export default function ProductDiscussionCard() {
  const discussions = [
    {
      user: "Lukas",
      time: "40 menit lalu",
      question: "Kak tuker barang bisa ga?",
      reply: "Halo, mohon maaf tidak bisa ditukar ya kak 🙏",
    },
    {
      user: "Indah",
      time: "1 jam lalu",
      question: "Apakah warna asli sama seperti di foto?",
      reply: "Iya kak, foto sesuai barang yang dikirim.",
    },
  ];

  return (
    <div className="space-y-4">
      {discussions.map((item, i) => (
        <div
          key={i}
          className="bg-green-50 border-1 border-green-300 rounded-md p-4 space-y-3"
        >
          <div className="flex items-start gap-3 ">
            <div className="w-8 min-w-8 aspect-square rounded-full bg-gray-400 text-white flex items-center justify-center text-xs font-bold shrink-0">
              {item.user.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">
                Oleh {item.user} • {item.time}
              </p>
              <p className="text-base font-semibold text-gray-800">
                {item.question}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-white border border-green-200 rounded-md px-3 py-2 text-sm text-gray-700">
            <div className="w-8 min-w-8 aspect-square rounded-full bg-green-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
              CS
            </div>
            <div>
              <p className="font-semibold text-green-700 mb-1">Balasan CS:</p>
              <p>{item.reply}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
