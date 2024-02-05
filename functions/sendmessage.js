export async function onRequestPost(context) {
  try {
    console.log(context);

    const telegramBotToken = '5458783596:AAGrAKN5Su7ApVD6LeWKfQ6bosVk1V8bxZ4';
    const telegramChatId = '-860374952';

    let input = await context.request.formData();
    // Разбор данных из формы
    // const formData = JSON.parse(event.body);
    // const { Недвижимость, Спальня, Бюджет, Имя, Ватсап, Телефон } = formData;

    // // Получение гет-параметров
    // const urlParams = new URLSearchParams(event.queryStringParameters);
    // const sub1 = urlParams.get('sub1') || '';
    // const keyword = urlParams.get('keyword') || '';
    // const gclid = urlParams.get('gclid') || '';

    // // Формирование текста сообщения для Telegram с добавлением гет-параметров
    // const message = `
    //   Новая заявка!
    //   Недвижимость: ${Недвижимость}
    //   Спальня: ${Спальня}
    //   Бюджет: ${Бюджет}
    //   Имя: ${Имя}
    //   Ватсап: ${Ватсап || 'Не указан'}
    //   Телефон: ${Телефон || 'Не указан'}
    //   sub1: ${sub1}
    //   keyword: ${keyword}
    //   gclid: ${gclid}
    // `;

    // Отправка сообщения в Telegram
    const telegramApiUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;
    await fetch(telegramApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: telegramChatId,
        text: input,
      }),
    });

    // Возвращаем успешный ответ
    return new Response('Nice', { status: 200, text: "Все супер" });
  } catch (error) {
    console.error('Ошибка обработки формы:', error);

    // Возвращаем ответ об ошибке
    return new Response('Error parsing JSON content', { status: 400 });
  }
}