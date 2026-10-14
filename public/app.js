// Notice Paper — Client Application

(function() {
  'use strict';

  // Sample Overdue Utility Bill (Fictional, aligned with PRD & Spec)
  const SAMPLE_OVERDUE_BILL = `APEX ENERGY SERVICES
P.O. Box 4821, Metropolis, NY 10001
Customer Service: 1-800-555-0144 | Automated Pay Line: 1-800-555-0199
Website: https://apexenergy.example.com

Date of Notice: October 2, 2026
Account Number: 8492-1049-38
Service Address: 742 Evergreen Terrace, Apt 3B, Metropolis, NY

URGENT: FINAL NOTICE PRIOR TO SERVICE DISCONNECTION

Dear Alex Taylor,

Our records indicate that your electric utility account has an outstanding balance of $145.20 that is significantly past due. Despite prior reminders, we have not received payment for electric service provided between August 15 and September 15.

IMPORTANT DEADLINE:
To prevent interruption of electric service, the full delinquent balance of $145.20 must be received by 5:00 PM on October 24, 2026.

CONSEQUENCES OF NON-PAYMENT:
If payment is not received by October 24, 2026, electric service to your premises is scheduled for disconnection starting October 25, 2026. If disconnection occurs:
1. A standard reconnection fee of $35.00 will be added to your account.
2. A mandatory security deposit may be required before service can be restored.
3. Restoration may take up to 48 hours following full receipt of funds.

HOW TO RESOLVE THIS BILL:
1. Pay Online: Visit apexenergy.example.com/pay and log in with your account number to pay by debit or credit card immediately.
2. Pay by Phone: Call our automated payment system 24/7 at 1-800-555-0199.
3. Payment Assistance or Dispute: If you are experiencing financial hardship or believe this balance is in dispute, please contact our Customer Care line immediately at 1-800-555-0144 before October 24, 2026 to discuss payment arrangements.

Thank you for your prompt attention to this urgent matter.

Sincerely,
Collections Department
Apex Energy Services`;

  // UI Localization Dictionary
  const I18N = {
    en: {
      title: "Notice Paper",
      subtitle: "Paste an official letter, get a plain explanation and next steps.",
      privacyText: "Text is sent to a third-party AI service for processing, which may retain data per its own terms. Do not paste sensitive personal data (national ID, bank account, passwords).",
      sampleBtn: "Try sample letter",
      placeholder: "Paste the full text of your letter or bill here...",
      actionBtn: "Explain this letter",
      actionLoading: "Reading letter...",
      loadingInit: "Reading your letter, usually takes a few seconds.",
      loadingSlow: "Still working on it, please hold on...",
      charCounter: (count) => `${count.toLocaleString('en-US')} / 10,000 characters`,
      errorEmpty: "Please paste the letter text first so it can be explained.",
      errorShort: "This text is too short to explain. Try pasting the full letter.",
      errorLong: "This text is too long for this demo (maximum 10,000 characters). Please paste only the main letter or notice pages.",
      emptyTitle: "Ready to Read",
      emptyDesc: "Your plain-language explanation will appear here after you paste a letter and click the button.",
      deadlineLabel: "DEADLINE & AMOUNT",
      dueDateLabel: "Due Date:",
      amountLabel: "Amount Due:",
      noDeadline: "No deadline was mentioned.",
      noAmount: "No payment amount was mentioned.",
      verifiedBadge: "Verified in text",
      unverifiedBadge: "Not confirmed in the letter text",
      summaryTitle: "What This Letter Is About",
      consequencesTitle: "What Happens If Ignored",
      stepsTitle: "What You Should Do Next",
      uncertaintiesTitle: "Points Needing Clarification",
      uncertaintiesIntro: "Some details in this letter are ambiguous or incomplete. We recommend contacting the sender directly:",
      disclaimer: "Notice Paper is a plain-language reading aid, not official legal or financial advice.",
      errorNetworkTitle: "Connection Problem",
      errorNetworkDesc: "It looks like your internet connection was lost.",
      errorConfigTitle: "Configuration Issue",
      errorConfigDesc: "The AI service is not properly configured on the server (e.g. invalid API key or model name). Please check the server settings.",
      errorServiceTitle: "Service Busy",
      errorServiceDesc: "The explanation service is temporarily busy.",
      errorReassurance: "Your letter is still safe in the box and hasn't been lost.",
      retryBtn: "Try again",
      noticeNonEnglishTitle: "English Letters Only",
      noticeNonEnglishDesc: "Notice Paper currently only supports letters written in English for this proof of concept. Please paste an English letter.",
      noticeNonLetterTitle: "Not an Official Letter",
      noticeNonLetterDesc: "This text does not appear to be an official letter, bill, or notice. Notice Paper explains official correspondence with deadlines or instructions."
    },
    id: {
      title: "Notice Paper",
      subtitle: "Tempel surat resmi, dapatkan penjelasan sederhana dan langkah berikutnya.",
      privacyText: "Teks surat dikirim ke layanan AI pihak ketiga untuk diproses, dan penyedia mungkin menyimpannya sesuai ketentuannya sendiri. Jangan menempelkan data pribadi sensitif (NIK, rekening bank, kata sandi).",
      sampleBtn: "Coba surat contoh",
      placeholder: "Tempel seluruh isi surat atau tagihan Anda di sini...",
      actionBtn: "Jelaskan surat ini",
      actionLoading: "Membaca surat...",
      loadingInit: "Sedang membaca surat Anda, biasanya hanya beberapa detik.",
      loadingSlow: "Masih diproses, mohon tunggu sebentar...",
      charCounter: (count) => `${count.toLocaleString('id-ID')} / 10.000 karakter`,
      errorEmpty: "Tempel isi surat dulu, ya, supaya bisa dijelaskan.",
      errorShort: "Teks ini terlalu pendek untuk dijelaskan. Coba tempel seluruh isi suratnya.",
      errorLong: "Teks ini terlalu panjang untuk demo ini (maksimal 10.000 karakter). Silakan tempel bagian utama surat atau pemberitahuan saja.",
      emptyTitle: "Siap Membaca",
      emptyDesc: "Penjelasan akan muncul di sini setelah Anda menempelkan surat dan menekan tombol.",
      deadlineLabel: "TENGGAT & NOMINAL",
      dueDateLabel: "Batas Tanggal:",
      amountLabel: "Total Tagihan:",
      noDeadline: "Tidak ada tenggat waktu yang disebutkan.",
      noAmount: "Tidak ada tagihan yang disebutkan.",
      verifiedBadge: "Sesuai isi surat",
      unverifiedBadge: "Tidak ditemukan langsung di surat",
      summaryTitle: "Ringkasan Isi Surat",
      consequencesTitle: "Akibat Jika Diabaikan",
      stepsTitle: "Langkah yang Perlu Dilakukan",
      uncertaintiesTitle: "Hal yang Perlu Dikonfirmasi",
      uncertaintiesIntro: "Beberapa bagian di surat ini ambigu atau kurang jelas. Disarankan bertanya langsung ke pengirim surat:",
      disclaimer: "Notice Paper adalah alat bantu membaca dengan bahasa sederhana, bukan penasihat hukum atau keuangan resmi.",
      errorNetworkTitle: "Masalah Koneksi",
      errorNetworkDesc: "Sepertinya koneksi internet terputus.",
      errorConfigTitle: "Kendala Konfigurasi",
      errorConfigDesc: "Layanan AI belum terkonfigurasi dengan benar di server (misalnya API key atau nama model belum sesuai). Silakan periksa pengaturan server.",
      errorServiceTitle: "Layanan Sedang Sibuk",
      errorServiceDesc: "Layanan penjelasan sedang sibuk atau mengalami kendala sementara.",
      errorReassurance: "Surat Anda masih ada di kotak, tidak hilang.",
      retryBtn: "Coba lagi",
      noticeNonEnglishTitle: "Hanya Surat Berbahasa Inggris",
      noticeNonEnglishDesc: "Notice Paper saat ini hanya mendukung surat berbahasa Inggris untuk proof of concept ini. Silakan tempel surat berbahasa Inggris.",
      noticeNonLetterTitle: "Bukan Surat Resmi",
      noticeNonLetterDesc: "Teks ini tampaknya bukan surat, tagihan, atau pemberitahuan resmi. Notice Paper dirancang untuk menjelaskan korespondensi resmi yang memiliki tenggat atau instruksi."
    }
  };

  // Application State
  const state = {
    language: 'en',
    isLoading: false,
    rawText: '',
    loadingTimer: null,
    lastResult: null,
    lastError: null
  };

  // DOM Elements
  const el = {
    langInputs: document.querySelectorAll('input[name="language"]'),
    uiTitle: document.getElementById('ui-title'),
    uiSubtitle: document.getElementById('ui-subtitle'),
    uiPrivacyText: document.getElementById('ui-privacy-text'),
    uiSampleBtn: document.getElementById('ui-sample-btn'),
    btnSample: document.getElementById('btn-sample'),
    letterInput: document.getElementById('letter-input'),
    charCounter: document.getElementById('char-counter'),
    inputErrorMsg: document.getElementById('input-error-msg'),
    btnExplain: document.getElementById('btn-explain'),
    btnSpinner: document.getElementById('btn-spinner'),
    uiActionBtn: document.getElementById('ui-action-btn'),
    
    // States
    stateEmpty: document.getElementById('state-empty'),
    uiEmptyTitle: document.getElementById('ui-empty-title'),
    uiEmptyDesc: document.getElementById('ui-empty-desc'),
    stateLoading: document.getElementById('state-loading'),
    uiLoadingText: document.getElementById('ui-loading-text'),
    stateError: document.getElementById('state-error'),
    errorTitle: document.getElementById('error-title'),
    errorDesc: document.getElementById('error-desc'),
    uiErrorReassurance: document.getElementById('ui-error-reassurance'),
    btnRetry: document.getElementById('btn-retry'),
    uiRetryBtn: document.getElementById('ui-retry-btn'),
    stateNotice: document.getElementById('state-notice'),
    noticeTitle: document.getElementById('notice-title'),
    noticeDesc: document.getElementById('notice-desc'),
    
    // Results
    resultsContainer: document.getElementById('results-container'),
    resultsSection: document.getElementById('results-section'),
    uiDeadlineLabel: document.getElementById('ui-deadline-label'),
    uiDueDateLabel: document.getElementById('ui-due-date-label'),
    uiAmountLabel: document.getElementById('ui-amount-label'),
    resultDeadline: document.getElementById('result-deadline'),
    resultAmount: document.getElementById('result-amount'),
    badgeDeadlineStatus: document.getElementById('badge-deadline-status'),
    badgeAmountStatus: document.getElementById('badge-amount-status'),
    uiSummaryTitle: document.getElementById('ui-summary-title'),
    resultSummary: document.getElementById('result-summary'),
    uiConsequencesTitle: document.getElementById('ui-consequences-title'),
    resultConsequences: document.getElementById('result-consequences'),
    uiStepsTitle: document.getElementById('ui-steps-title'),
    resultSteps: document.getElementById('result-steps'),
    cardUncertainties: document.getElementById('card-uncertainties'),
    uiUncertaintiesTitle: document.getElementById('ui-uncertainties-title'),
    uiUncertaintiesIntro: document.getElementById('ui-uncertainties-intro'),
    resultUncertainties: document.getElementById('result-uncertainties'),
    uiDisclaimer: document.getElementById('ui-disclaimer')
  };

  // Helper: Count words
  function countWords(str) {
    return str.trim().split(/\s+/).filter(Boolean).length;
  }

  // Helper: Set language
  function setLanguage(lang) {
    state.language = lang;
    const t = I18N[lang];

    el.uiTitle.textContent = t.title;
    el.uiSubtitle.textContent = t.subtitle;
    el.uiPrivacyText.textContent = t.privacyText;
    el.uiSampleBtn.textContent = t.sampleBtn;
    el.letterInput.placeholder = t.placeholder;
    el.uiActionBtn.textContent = state.isLoading ? t.actionLoading : t.actionBtn;
    el.uiEmptyTitle.textContent = t.emptyTitle;
    el.uiEmptyDesc.textContent = t.emptyDesc;
    el.uiDeadlineLabel.textContent = t.deadlineLabel;
    el.uiDueDateLabel.textContent = t.dueDateLabel;
    el.uiAmountLabel.textContent = t.amountLabel;
    el.uiSummaryTitle.textContent = t.summaryTitle;
    el.uiConsequencesTitle.textContent = t.consequencesTitle;
    el.uiStepsTitle.textContent = t.stepsTitle;
    el.uiUncertaintiesTitle.textContent = t.uncertaintiesTitle;
    el.uiUncertaintiesIntro.textContent = t.uncertaintiesIntro;
    el.uiDisclaimer.textContent = t.disclaimer;
    el.uiErrorReassurance.textContent = t.errorReassurance;
    el.uiRetryBtn.textContent = t.retryBtn;

    if (!el.stateError.hidden && state.lastError) {
      applyErrorContent(state.lastError);
    }

    updateCharCounter();
  }

  // Update Character Counter
  function updateCharCounter() {
    const len = el.letterInput.value.length;
    el.charCounter.textContent = I18N[state.language].charCounter(len);
    if (len > 10000) {
      el.charCounter.style.color = 'var(--alert-terracotta)';
      el.charCounter.style.fontWeight = 'bold';
    } else {
      el.charCounter.style.color = '';
      el.charCounter.style.fontWeight = '';
    }
  }

  // Clear Inline Errors
  function clearInlineError() {
    el.inputErrorMsg.textContent = '';
    el.inputErrorMsg.hidden = true;
  }

  // Show Inline Error
  function showInlineError(message) {
    el.inputErrorMsg.textContent = message;
    el.inputErrorMsg.hidden = false;
    el.letterInput.focus();
  }

  // Client Validation
  function validateInput(text) {
    const t = I18N[state.language];
    clearInlineError();

    if (!text || text.trim().length === 0) {
      showInlineError(t.errorEmpty);
      return false;
    }

    const wordCount = countWords(text);
    if (wordCount < 15) {
      showInlineError(t.errorShort);
      return false;
    }

    if (text.length > 10000) {
      showInlineError(t.errorLong);
      return false;
    }

    return true;
  }

  // Load Sample Letter
  function loadSample() {
    el.letterInput.value = SAMPLE_OVERDUE_BILL;
    clearInlineError();
    updateCharCounter();
    el.letterInput.focus();
  }

  // Show/Hide States
  function showState(stateName) {
    el.stateEmpty.hidden = (stateName !== 'empty');
    el.stateLoading.hidden = (stateName !== 'loading');
    el.stateError.hidden = (stateName !== 'error');
    el.stateNotice.hidden = (stateName !== 'notice');
    el.resultsContainer.hidden = (stateName !== 'results');
  }

  // Set Loading UI
  function setLoading(loading) {
    state.isLoading = loading;
    const t = I18N[state.language];

    if (loading) {
      el.btnExplain.disabled = true;
      el.btnSpinner.hidden = false;
      el.uiActionBtn.textContent = t.actionLoading;
      el.letterInput.disabled = true;
      el.btnSample.disabled = true;

      el.uiLoadingText.textContent = t.loadingInit;
      showState('loading');

      // 10s timer fallback message
      state.loadingTimer = setTimeout(() => {
        if (state.isLoading) {
          el.uiLoadingText.textContent = t.loadingSlow;
        }
      }, 10000);
    } else {
      clearTimeout(state.loadingTimer);
      el.btnExplain.disabled = false;
      el.btnSpinner.hidden = true;
      el.uiActionBtn.textContent = t.actionBtn;
      el.letterInput.disabled = false;
      el.btnSample.disabled = false;
    }
  }

  // Event Listeners
  el.langInputs.forEach(input => {
    input.addEventListener('change', (e) => {
      setLanguage(e.target.value);
    });
  });

  el.letterInput.addEventListener('input', () => {
    clearInlineError();
    updateCharCounter();
  });

  el.btnSample.addEventListener('click', loadSample);

  el.btnExplain.addEventListener('click', async () => {
    const text = el.letterInput.value;
    if (!validateInput(text)) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: text,
          language: state.language
        })
      });

      let resData = null;
      try {
        resData = await response.json();
      } catch (parseErr) {
        // Not a JSON response
      }

      if (!response.ok || !resData || !resData.success) {
        const error = new Error((resData && resData.error) || 'SERVER_ERROR');
        error.status = response.status;
        error.errorType = resData && resData.error;
        error.category = resData && resData.category;
        throw error;
      }

      state.lastError = null;
      renderResults(resData.data);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  });

  el.btnRetry.addEventListener('click', () => {
    el.btnExplain.click();
  });

  // Render Results (Prepared for Slice 2 & 3)
  function renderResults(data) {
    const t = I18N[state.language];

    // Check non-English state
    if (data.is_english === false) {
      el.noticeTitle.textContent = t.noticeNonEnglishTitle;
      el.noticeDesc.textContent = t.noticeNonEnglishDesc;
      showState('notice');
      scrollToResults();
      return;
    }

    // Check not an official letter state
    if (data.is_official_letter === false) {
      el.noticeTitle.textContent = t.noticeNonLetterTitle;
      el.noticeDesc.textContent = t.noticeNonLetterDesc;
      showState('notice');
      scrollToResults();
      return;
    }

    // Happy Path: Populate Results
    showState('results');

    // Deadline & Amount
    el.resultDeadline.textContent = data.deadline || t.noDeadline;
    el.resultAmount.textContent = data.amount_due || t.noAmount;

    // Verbatim Badges (Slice 3)
    if (data.amount_due) {
      el.badgeAmountStatus.hidden = false;
      if (data.amount_verified) {
        el.badgeAmountStatus.textContent = t.verifiedBadge;
        el.badgeAmountStatus.className = 'badge-verification verified';
      } else {
        el.badgeAmountStatus.textContent = t.unverifiedBadge;
        el.badgeAmountStatus.className = 'badge-verification unverified';
      }
    } else {
      el.badgeAmountStatus.hidden = true;
    }

    if (data.deadline) {
      el.badgeDeadlineStatus.hidden = false;
      if (data.deadline_verified) {
        el.badgeDeadlineStatus.textContent = t.verifiedBadge;
        el.badgeDeadlineStatus.className = 'badge-verification verified';
      } else {
        el.badgeDeadlineStatus.textContent = t.unverifiedBadge;
        el.badgeDeadlineStatus.className = 'badge-verification unverified';
      }
    } else {
      el.badgeDeadlineStatus.hidden = true;
    }

    // Summary & Consequences
    el.resultSummary.textContent = data.summary || '';
    el.resultConsequences.textContent = data.consequences || '';

    // Next Steps (Up to 3)
    el.resultSteps.innerHTML = '';
    const steps = (data.next_steps || []).slice(0, 3);
    steps.forEach(step => {
      const li = document.createElement('li');
      li.textContent = step;
      el.resultSteps.appendChild(li);
    });

    // Uncertainty Flags
    if (data.uncertainties && data.uncertainties.length > 0) {
      el.cardUncertainties.hidden = false;
      el.resultUncertainties.innerHTML = '';
      data.uncertainties.forEach(u => {
        const li = document.createElement('li');
        li.textContent = u;
        el.resultUncertainties.appendChild(li);
      });
    } else {
      el.cardUncertainties.hidden = true;
    }

    scrollToResults();
  }

  // Apply Error Content based on classification
  function applyErrorContent(err) {
    const t = I18N[state.language];

    const isConfigError = err.errorType === 'CONFIG_ERROR' ||
                          ['MODEL_NOT_FOUND', 'AUTH_ERROR', 'API_KEY_MISSING'].includes(err.category) ||
                          err.status === 401 || err.status === 404;

    const isNetworkError = err.name === 'TypeError' || err.message === 'NETWORK_ERROR' || !navigator.onLine;

    if (isNetworkError) {
      el.errorTitle.textContent = t.errorNetworkTitle;
      el.errorDesc.textContent = t.errorNetworkDesc;
      el.btnRetry.hidden = false;
    } else if (isConfigError) {
      el.errorTitle.textContent = t.errorConfigTitle;
      el.errorDesc.textContent = t.errorConfigDesc;
      el.btnRetry.hidden = true; // Retrying without server fix will just fail again
    } else {
      el.errorTitle.textContent = t.errorServiceTitle;
      el.errorDesc.textContent = t.errorServiceDesc;
      el.btnRetry.hidden = false;
    }
  }

  // Handle Error
  function handleError(err) {
    state.lastError = err;
    applyErrorContent(err);
    showState('error');
    scrollToResults();
  }

  // Smooth Auto-scroll for Mobile
  function scrollToResults() {
    if (window.innerWidth < 768) {
      el.resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Initial setup
  setLanguage('en');
  showState('empty');

  // Export for test/verification runner
  window.__noticePaperTest = {
    validateInput,
    countWords,
    setLanguage,
    loadSample
  };

})();
