import Swal from "sweetalert2";

export const showConfirmationDialog = async () => {
  return await Swal.fire({
    html: `
     <div class="flex flex-col justify-center gap-2">
        <img src="/confirm.png" alt="Warning Image" class="w!-40 !h-40 object-contain" />
         <span class="text-primary-primary font-bold text-2xl">Peringatan !</span>
      <p class="text-sm">Apakah anda yakin?</p>
      </div>
    `,
    showCancelButton: true,
    confirmButtonText: "Iya",
    cancelButtonText: "Engga",
    customClass: {
      popup: "rounded-xl bg-white px-6 pt-6 pb-4 shadow-lg",
      title: "text-center",
      htmlContainer: "text-center",
      actions: "!grid grid-cols-2 w-full gap-2",
      confirmButton: "login w-full",
      cancelButton: "signup w-full",
    },
    buttonsStyling: false,
    icon: undefined,
  });
};

export const showConfirmationLogoutDialog = async () => {
  return await Swal.fire({
    html: `
     <div class="flex flex-col justify-center gap-2">
        <img src="/logout.png" alt="Warning Image" class="w!-40 !h-40 object-contain" />
         <span class="text-primary-primary font-bold text-2xl">Peringatan !</span>
      <p class="text-sm">Apakah anda yakin untuk keluar?</p>
      </div>
     
    `,
    showCancelButton: true,
    showConfirmButton: true,
    confirmButtonText: "Iya",
    cancelButtonText: "Engga",
    customClass: {
      popup: "rounded-xl bg-white px-6 pt-6 pb-4 shadow-lg",
      title: "text-center",
      htmlContainer: "text-center",
      actions: "!grid grid-cols-2 w-full gap-2",
      confirmButton: "login w-full",
      cancelButton: "signup w-full",
    },
    buttonsStyling: false,
    // Hapus icon default
    icon: undefined,
  });
};

export const showSuccessDialog = async () => {
  return await Swal.fire({
    html: `
     <div class="flex flex-col justify-center gap-2">
        <img src="/success.png" alt="Warning Image" class="w!-40 !h-40 object-contain" />
         <span class="text-background-primary font-bold text-2xl">Berhasil!!!</span>
      </div>
     
    `,
    showConfirmButton: true,
    confirmButtonText: "Lanjutkan",
    customClass: {
      popup: "rounded-xl gradient-style px-6 pt-6 pb-4 shadow-xl",
      title: "text-center",
      htmlContainer: "text-center",
      confirmButton: "bg-white text-primary-primary px-6 py-2 rounded-md font-semibold text-sm hover:bg-gray-100 w-full",
    },
    icon: undefined,
  });
};

export const showSuccessLoginDialog = async () => {
  return await Swal.fire({
    html: `
     <div class="flex flex-col justify-center gap-2">
        <img src="/welcome.png" alt="Success" class="w!-40 !h-40 object-contain" />
         <span class="text-background-primary font-bold text-2xl">Selamat datang!!!</span>
      </div>
    `,
    showConfirmButton: true,
    confirmButtonText: "Lanjutkan",
    customClass: {
      popup: "rounded-xl gradient-style px-6 pt-6 pb-4 shadow-xl",
      htmlContainer: "text-center",
      confirmButton: "bg-white text-primary-primary px-6 py-2 rounded-md font-semibold text-sm hover:bg-gray-100 w-full",
    },
    buttonsStyling: false,
    icon: undefined,
  });
};

export const showSuccessLogoutDialog = async () => {
  return await Swal.fire({
    html: `
     <div class="flex flex-col justify-center gap-2">
        <img src="/welcome.png" alt="Warning Image" class="w!-40 !h-40 object-contain" />
         <span class="text-background-primary font-bold text-2xl">Sampai Jumpa!!!</span>
      </div>
     
    `,
    showConfirmButton: true,
    confirmButtonText: "Lanjutkan",
    customClass: {
      popup: "rounded-xl gradient-style px-6 pt-6 pb-4 shadow-xl",
      title: "text-center",
      htmlContainer: "text-center",
      confirmButton: "bg-white text-primary-primary px-6 py-2 rounded-md font-semibold text-sm hover:bg-gray-100 w-full",
    },
    buttonsStyling: false,
    icon: undefined,
  });
};

export const showErrorDialog = async (message: string = "Terjadi kesalahan saat memproses data.") => {
  return await Swal.fire({
    title: '<span class="text-danger-primary font-bold text-xl">Gagal !</span>',
    html: `<p class="text-gray-700 text-sm mt-2">${message}</p>`,
    iconHtml: `<img src="/error.png" class="mx-auto w-20 h-20" />`,
    confirmButtonText: "Tutup",
    customClass: {
      popup: "rounded-xl bg-white px-6 pt-6 pb-4 shadow-lg",
      title: "text-center",
      htmlContainer: "text-center",
      confirmButton: "bg-danger-primary text-white px-6 py-2 rounded-md font-medium text-sm hover:bg-red-600",
    },
    buttonsStyling: false,
    icon: "error",
  });
};
